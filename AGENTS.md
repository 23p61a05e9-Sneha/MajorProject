<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Keep CrowdGuard shared session state in CommandProvider and navigation in CommandShell; section routes stay independently addressable.
- Define CommandContext in a non-component module so preview refreshes preserve the same context identity for mounted providers and consumers.
- Keep demonstration fixtures and future Flask request adapters separate from UI; no frontend AI, real authentication or live backend claims.
- Define all semantic status and surface colors in src/styles.css; monitoring overlays use percentage geometry for stable image alignment.
