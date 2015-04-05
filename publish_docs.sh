#!/usr/bin/env sh

dir=`dirname $0`

# 生成文档
cd $dir
npm run docs

cd "$dir/docs"

if [[ ! -d ./.git ]]; then
  git init
  git remote add origin git@github.com:qiu8310/smart-npm.git
  git co -b gh-pages
else
  git co gh-pages -f
fi

git add . -A
git commit -m "publish docs"
git push origin gh-pages --force

cd $dir





