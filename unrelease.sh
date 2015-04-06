#!/bin/sh

if test $# -gt 0; then
  git tag -d $1
  git push origin :refs/tags/$1
  npm unpublish smart-npm@$1
else
  echo '\033[31m version number required \033[0m'
  exit 1
fi
