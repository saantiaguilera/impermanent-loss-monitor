## Impermanent loss monitor

This bot allows you to define multi-weighted token pools and monitor it's impermanent loss health through a threshold. If the IL surpasses the given threshold of an asset it will notify through a telegram bot about it.

This is useful when staking volatile LPs or to detect as soon as possible off-peggs (such as the pBTC hack)

### Usage

1. Copy `template_telegram.json` as `telegram.json` with your credentials
2. Configure the pools and chains you wish to support
3. Run with `ts-node src/main/main.ts` and get notified if an IL surpassed a threshold

### Cron

For usage simply create a crontab (`crontab -e`, set the time interval you would like to be called and make it execute the cron.sh script), that's it.
