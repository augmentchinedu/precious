# Agent Interaction Protocol Specification

## 1. Introduction

This document specifies the formal protocol for how autonomous agents interact with the Augment Plus `ExecutionController`. It serves as the canonical reference for agent developers and for the architects evolving the platform's core services.

Adherence to this protocol is mandatory for all agents to ensure predictable behavior, transactional integrity, and system stability.

## 2. Current Protocol: `FILE_ACTION`

The current protocol supports a single, atomic file operation.

### 2.1. Structure

```
===FILE_ACTION===
type: create | append
path: relative/path/to/file.md
