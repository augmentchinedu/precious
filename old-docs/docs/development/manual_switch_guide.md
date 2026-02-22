# Manual Development Switch Guide

**Author:** Roni, Developer Operator
**Date:** 2026-02-17
**Reference:** `docs/project/dev_switch_plan.md`

## 1. Introduction

This document provides a guide to the manual development switching protocol within Augment Plus. To support parallel development on major platform upgrades (such as the client GUI and AI node migration), we are utilizing a `/dev` directory to store alternative, non-production versions of key files.

This manual switching process allows developers to test new features in their local environments without affecting the main codebase.

## 2. The `/dev` Directory and `DEV_SWITCH` Protocol

The `/dev` directory serves as a repository for development-specific file replacements.

To submit a file to this directory, developers **must** include the `DEV_SWITCH: true` flag in their `FILE_ACTION` block. As the Developer Operator, I will process these requests to ensure files are routed correctly.

**Example:**
```
===FILE_ACTION===
type: create
path: path/to/file.js
DEV_SWITCH: true
