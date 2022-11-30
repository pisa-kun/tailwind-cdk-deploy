# AWS CDKでtailwindcssデプロイ　

## 手順

1. mkdir tailwind-cdk-deploy && cd tailwind-cdk-deploy
2. cdk init --language typescript
3. npm install -D @aws-cdk/aws-s3 @aws-cdk/aws-s3-deployment
4. mkdir tailwind && cd tailwind
5. npm init -y
6. npm install -D tailwindcss
7. npx tailwindcss init
8. ファイル修正
9. npx tailwindcss -i ./src/input.css -o ./dist/output.css
10. src/index.htmlの作成



[CDKでS3バケットポリシーを設定する](https://qiita.com/ohanamisan_Ba/items/24a4d8f4f7cd79ccaec2)