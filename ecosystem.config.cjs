module.exports = {
  apps: [
    {
      name: "community-med",
      script: "node_modules/.bin/next",
      args: "start -p 3001",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: 3001,
      },
      // 自動重啟設定
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",

      // Log 設定（稽核用）
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      error_file: "./logs/error.log",
      out_file: "./logs/access.log",
      merge_logs: true,

      // 進階設定
      instances: 1, // 單實例即可
      exec_mode: "fork",
    },
  ],
};
