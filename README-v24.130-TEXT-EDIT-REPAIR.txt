Duckie Days v24.130 — Text Edit Repair

This repair was built directly from the user-edited v24.129 project.

Fixed:
- Escaped the quotation marks around “Majo” in Miho's profile description. The unescaped quotes were terminating the JavaScript string early and prevented script-v24-129.js from parsing at all.
- Bumped the root JS/CSS and service-worker cache to v24.130 so browsers receive the repaired script.

Preserved:
- All profile text and gift-preference edits for Io, Miho, and Annika.
- All user-facing text edits in index.html.
- Duck Quest v60 / style v52 and the v24.129 theme work.

Validation:
- Root JavaScript syntax check passes.
- Duck Quest JavaScript syntax check passes.
- Service worker syntax check passes.
