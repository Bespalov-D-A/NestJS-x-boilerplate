#!/usr/bin/env sh

# Использование: ./wait-for-it.sh host:port [-- command args]
# Например: ./wait-for-it.sh localhost:5432 -- echo "PostgreSQL is up"

TIMEOUT=15
QUIET=0

echoerr() {
    if [ "$QUIET" -eq 0 ]; then echo "$@" 1>&2; fi
}

usage() {
    exitcode="$1"
    cat << USAGE >&2

Использование:
    $0 host:port [-t timeout] [-- command args]
    -q | --quiet                    Не выводить сообщения
    -t TIMEOUT | --timeout=timeout  Таймаут в секундах, после которого скрипт завершится с ошибкой (по умолчанию: 15 секунд)
    -- COMMAND ARGS                 Команда и её аргументы для выполнения после доступности порта

USAGE
    exit "$exitcode"
}

wait_for() {
    for i in `seq $TIMEOUT` ; do
        nc -z "$HOST" "$PORT" > /dev/null 2>&1

        result=$?
        if [ $result -eq 0 ] ; then
            if [ $QUIET -eq 0 ]; then echo "$HOST:$PORT is available after $i seconds"; fi
            return 0
        fi
        sleep 1
    done
    echo "Operation timed out" >&2
    return 1
}

while [ $# -gt 0 ]
do
    case "$1" in
        *:* )
        HOST=$(echo $1 | sed -e 's/:.*//')
        PORT=$(echo $1 | sed -e 's/.*://')
        shift 1
        ;;
        -q | --quiet)
        QUIET=1
        shift 1
        ;;
        -t)
        TIMEOUT="$2"
        if [ -z "$TIMEOUT" ]; then break; fi
        shift 2
        ;;
        --timeout=*)
        TIMEOUT="${1#*=}"
        shift 1
        ;;
        --)
        shift
        break
        ;;
        --help)
        usage 0
        ;;
        *)
        echoerr "Unknown argument: $1"
        usage 1
        ;;
    esac
done

if [ -z "$HOST" ] || [ -z "$PORT" ]; then
    echoerr "Error: you need to provide a host and port to test."
    usage 2
fi

wait_for

RESULT=$?
if [ $RESULT -ne 0 ]; then
    exit $RESULT
fi

if [ $# -gt 0 ]; then
    exec "$@"
else
    exit 0
fi
