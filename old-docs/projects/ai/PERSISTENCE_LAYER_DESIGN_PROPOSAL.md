# Persistence Layer Design Proposal

**Author:** Andrew, Developer
**Audience:** Michael (Project Architect), Roni (Developer Operator), All Developers

## 1. Objective

This document proposes a refined design for the Persistence Layer Interface introduced in `ARCHITECTURE_OVERVIEW.md`. The goal is to create an abstraction that is not only compatible with our current file-system backend but is also architecturally aligned with the future migration to a document database (MongoDB).

## 2. Critique of the File-System Interface

The proposed interface of `read(path)`, `write(path, content)`, and `append(path, content)` is problematic for several reasons:

-   **Paradigm Mismatch:** It enforces a file-system paradigm (hierarchical paths, opaque content) rather than a database paradigm (collections, documents, queries).
-   **Limits Future Capabilities:** It provides no clear path for introducing structured queries, indexing, or atomic updates, which are key benefits of MongoDB.
-   **Encourages Bad Practices:** Developers will be forced to implement their own serialization (e.g., JSON stringify) and filtering logic on top of this simple interface, leading to duplicated and inconsistent code.

## 3. Proposed Document-Oriented Interface

I propose we define the interface in terms of logical document operations. This forces developers to think in terms of structured data from the outset.

### Core Concepts:

-   **Collection:** A logical grouping of documents (e.g., 'agents', 'logs', 'project_docs').
-   **Document:** A dictionary-like structure (e.g., a JSON object) with a unique ID within its collection.

### Proposed Interface Methods:

-   `create_document(collection: str, document: dict) -> str`: Inserts a new document into a collection and returns its unique ID.
-   `get_document(collection: str, document_id: str) -> dict | None`: Retrieves a single document by its ID.
-   `update_document(collection: str, document_id: str, updates: dict)`: Updates specific fields within a document.
-   `delete_document(collection: str, document_id: str)`: Deletes a document.
-   `find_documents(collection: str, filter: dict, limit: int = None) -> list[dict]`: Finds all documents in a collection that match a filter query.

## 4. Implementation Strategy

This interface provides a clear path for progressive enhancement.

### Phase 1: File System Implementation (Immediate)

We can implement this interface *today* on top of the existing file system to ensure no disruption.

-   `create_document('my_docs', {'foo': 'bar'})`: Creates a file at `data/my_docs/{uuid}.json` containing the document.
-   `get_document('my_docs', '{uuid}')`: Reads the file `data/my_docs/{uuid}.json`.
-   `find_documents('my_docs', {'foo': 'bar'})`: A simple implementation would iterate through all files in the `data/my_docs/` directory, load the JSON from each, and filter them in memory. This is inefficient but functional for our current scale.

### Phase 2: MongoDB Implementation (Future)

When we migrate, we only need to swap the implementation of the persistence layer. The agent code remains unchanged.

-   `create_document('my_docs', {'foo': 'bar'})`: Becomes `db.my_docs.insertOne({'foo': 'bar'})`.
-   `get_document('my_docs', '{uuid}')`: Becomes `db.my_docs.findOne({'_id': '{uuid}'})`.
-   `find_documents('my_docs', {'foo': 'bar'})`: Becomes `db.my_docs.find({'foo': 'bar'})`, leveraging native database indexing and performance.

## 5. Conclusion

Adopting a document-oriented persistence interface now is a strategic architectural decision. It aligns our current development with our future goals, minimizes the cost of the upcoming database migration, and provides a more powerful and developer-friendly abstraction for data management. This approach directly addresses the developer needs highlighted by myself, Benson, and Clark, while providing the concrete Data Access Layer required for Roni's operational plans. It is the necessary step to turn Michael's high-level principle of "Persistence Abstraction" into a practical reality.
