---
'ts-fortress': patch
---

`IntRange<Start, End>` is now re-exported from `ts-type-forge` instead of being
declared locally, mirroring how `UintRange` is already handled. The exported
type name and its semantics are unchanged.

Requires `ts-type-forge` >= 7.3.0, the release that adds `IntRange`.
