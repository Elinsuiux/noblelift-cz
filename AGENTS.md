# Agent notes

Preview the `pages/vzv.cz` static dump. Do not invent artwork. Do not use the Vercel CLI.

## Cursor Cloud specific instructions

`127.0.0.1:8082` is the agent VM, not the user's computer. Never give localhost URLs as the way to review work.

### Public preview (shareable)

Start a UTF-8 static server plus a Cloudflare quick tunnel:

```bash
bash scripts/start-public-preview.sh
```

Give the user the printed `https://….trycloudflare.com/pages/vzv.cz/cz/index/index.html` URL.

That link is public. Anyone who has it can open the site in a normal browser, on any computer, with no Cursor or VPN. The homepage also lives at `/` on the same host (it redirects).

Limits:

- The URL only works while this Cloud Agent session is running and the tunnel process is up.
- Each new session (or tunnel restart) gets a **new** random `*.trycloudflare.com` hostname. Do not reuse an old one.
- This is a temporary review link, not production. Do not run `vercel` / Vercel CLI to publish.

If the script is already running, run it again. It is idempotent and reprints the current public URL from `/tmp/vzv-public-preview.url`.

### Local ports on the VM (for the agent, not the user)

Serve the dump as UTF-8. Port `8081` garbles Czech. Bind review servers to `0.0.0.0` so Cursor can forward them.

| Port | Bind | Use |
| --- | --- | --- |
| `8090` | `0.0.0.0` | Public-preview origin started by `scripts/start-public-preview.sh` |
| `8082` | VM loopback | Agent-only UTF-8 dump, if already running |
| `8081` | VM loopback | Do not use for Czech pages |

Cursor port forwarding (`localhost` on the user's machine) only works in the Agents window with the plug icon / Auto-Forward Ports. Still prefer the trycloudflare URL so other people can check the same page.

### After visual changes

Hard-refresh with a cache-busting query such as `?v=…`. Confirm the public URL still shows the change before telling the user it is done.
