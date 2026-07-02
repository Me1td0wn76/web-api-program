# API DOC

## Numbers: 進数変換関係

### get_base_conversion: 指定した進数へ変換した結果を取得する

- 引数:
  - `base` (integer, 必須): 変換先の進数 (2〜1023)
- 戻り値:
  - `dict`: 変換結果の JSON
    - `decimal` (str): 元の 10 進数値
    - `base` (number): 指定された進数
    - `result` (str): 変換結果 (base ≤ 62 は `0-9 a-z A-Z`、base > 62 は `[n]` 形式)
    - `digits` (number[]): 各桁の数値配列 (最上位桁から)
    - `digitCount` (number): 桁数
    - `generatedAt` (str): 生成日時 (ISO 8601)
- 用いた Web API
  - WEB-API-JS
  - 概略: ランダムな数値を 2〜1023 進数に変換して JSON で返す静的 Web API (認証不要)
  - URL: `https://me1td0wn76.github.io/web-api-js/base/{base}.json`
  - クエリパラメータ: なし (`base` は URL パスで指定)
  - 戻り値: JSON
