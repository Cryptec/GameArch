@(echo window._env_ = {& (for /F "tokens=1* delims== eol=#" %%I in (.env) do @echo %%I: "%%J",) & echo })> .\env-config.js