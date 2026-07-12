ChangeLog
=========

2.0.3 (2026-07-12)
------------------

* Fail parsing if date strings are over 15 characters.


2.0.2 (2025-07-30)
------------------

* Use file extensions even when importing type-only files. (@mxxk).


2.0.1 (2025-06-03)
------------------

* Update dependencies, including some dev depenendencies with security issues.
  (@apasel422)
* Fixed a few tests. (@apasel422)


2.0.0 (2024-10-02)
------------------

The "Structured Field Values" was updated in [RFC9651][rfc9651]. This new
specification added the ['Date'][9] and ['Display String'][10] field types. The
former encodes unix timestamp, the latter a Unicode string. Perfect time to
update this package as well! This new major release supports the new standard.

* #66: We now convert from/to `ArrayBuffer` instead of a custom ByteSequence
  object. This is a breaking change.
* Add support for `Date` and `DisplayString` from RFC9651.
* Switched to ESM, but we're still bundling a CommonJS build.
* No longer shipping a minified build.
* Dropped Chai and now using `node:assert`.
* Dropped Mocha and now using `node:test`.


2.0.0-alpha.1 (2024-02-23)
--------------------------

* Fixed `exports` value in `package.json`. (@CxRes)


2.0.0-alpha.0 (2024-01-29)
--------------------------

* Support for a new `Date` and `Display String` types, from the new draft
  [draft-ietf-httpbis-sfbis][7].
* Simplified serializing Dictionaries and Items. The existing signatures still
  work, but the new API is a bit more natural and doesn't require wrapping
  everything in arrays and Maps.
* Now requires Node 18.
* Converted to ESM.
* No longer providing a Webpack build. Most frontend applications already do
  their own bundling. Please let us know if you need this, so we can redo this
  with modern tools.


1.0.1 (2023-08-03)
------------------

* This library emitted `TypeError` or a plain `Error` in a few places in the
  parser, where it should have been `ParseError` this is corrected everywhere
  now.


1.0.0 (2023-06-13)
------------------

* This is mainly a re-release of 0.5.0. The package is stable and dependencies
  have been updated.
* Dropped support for Node 12. The minimum Node version is now 14.


0.5.0 (2022-09-13)
------------------

* All the serializer functions are now exported. (@adrianhopebailie)
* Added an `isByteSequence` helper function (@adrianhopebailie)
* Bring all dependencies up to date.


0.4.1 (2021-06-09)
------------------

* Corrected the 'main' property in `package.json`.


0.4.0 (2021-05-15)
------------------

* Fully up to date with [RFC8941][rfc8941].
* This is a complete rewrite, all APIs have changed and return the structures
  that are recommended by the actual RFC document.
* Passing almost all tests from the [HTTP WG test suite][6]. See the readme for
  the exceptions.


0.3.0 (2019-10-03)
------------------

* Fully up to date with [draft-ietf-httpbis-header-structure-13][4].
* Parameterized Lists and List of Lists are gone, their feautures are merged
  into List and Dictionaries.
* Both lists and dictionaries now require an object such as `{value: x,
  parameters: y}`. This is a breaking change, but was required to support
  parameters correctly everywhere.
* Stricter float parsing.


0.2.0 (2019-04-27)
------------------

* Fully up to date with [draft-ietf-httpbis-header-structure-10][3].
* True and False are now encoded as `?1` and `?0`.
* Added serializing support.
* Integers with more than 15 digits now error as per the new draft.
* Updated all dependencies.


0.1.0 (2018-12-06)
------------------

* Fully up to date with [draft-ietf-httpbis-header-structure-09][2].
* Package renamed to 'structured-headers'.
* Conversion to typescript.
* The `parseBinary` function is renamed to `parseByteSequence`, to match the
  rename in draft-ietf-httpbis-header-structure-08.
* Support for Booleans.
* The `parseIdentifier` function is renamed to `parseToken`, to match the
  rename in draft-ietf-httpbis-header-structure-09.
* Renamed `parseParameterizedList` to `parseParamList`. It's shorter.


0.0.2 (2018-03-27)
------------------

* Added minified webpacked version.
* Added readme.
* Fixed a small bug in identifier parsing.
* 100% unittest coverage.


0.0.1 (2018-03-26)
------------------

* First version!
* Parses all of the [04 draft of the specification][1].

[1]: https://tools.ietf.org/html/draft-ietf-httpbis-header-structure-04
[2]: https://tools.ietf.org/html/draft-ietf-httpbis-header-structure-09
[3]: https://tools.ietf.org/html/draft-ietf-httpbis-header-structure-10
[4]: https://tools.ietf.org/html/draft-ietf-httpbis-header-structure-13
[6]: https://github.com/httpwg/structured-field-tests
[7]: https://www.ietf.org/archive/id/draft-ietf-httpbis-sfbis-05.html
[9]: https://www.rfc-editor.org/rfc/rfc9651.html#name-dates
[10]: https://www.rfc-editor.org/rfc/rfc9651.html#name-display-strings
[rfc8941]: https://datatracker.ietf.org/doc/html/rfc8941
[rfc9651]: https://datatracker.ietf.org/doc/html/rfc9651
