cd $(dirname $0)

success() {
  echo "[ \033[0;32msuccess\033[0;37m ]: $1"
}

stop() {
  echo "[ \033[0;31mstop\033[0;37m ]: $1"
  exit 1
}

# main
path=${1:-slides}

# helpコマンド
if [ "${path}" = '-h' -o "${path}" = '--help' ]; then
  echo "[Usage]: "
  echo "sh $(basename $0) [directory name]"
  echo ""
  echo "[directory name] is option."
  echo "default: slides"
  exit 0

# easy_createと同じディレクトリにslides.mdが必要
elif [ ! -e "slides.md" ]; then
  stop "not found 'slides.md'"

# 既に存在するディレクトリがある
elif [ -e "${path}" ]; then
  stop "directory existed ${path}."

# reveal-ckがgem installされていない（pathが設定されていない）
elif [ "$(which reveal-ck)" = '' ]; then
  stop "required reveal-ck"

fi

# slidesディレクトリがある場合、一時的に退避する
mv_slides=''
if [ -e "slides" ]; then
  mv_slides=mv_slides

  # 既に退避するディレクトリがある
  if [ -e "${mv_slides}" ]; then
    stop "directory existed ${mv_slides}."
  fi

  mv slides ${mv_slides}
fi

reveal-ck generate
mv slides ${path}
mv slides.md ${path}

if [ ! "{mv_slides" = '' ]; then
  mv ${mv_slides} slides
fi
success "create directory [ ${path} ]"
