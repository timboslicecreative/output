const chalk = require('chalk');
const row = '----------------------------------------------------------------------'

const colors = {
    log: 'white',
    banner: 'green',
    error: 'bgRed',
    warn: 'yellow',
    debug: 'gray'
}

class Output {
    constructor(app = '', options = {}) {
        const {timestamp = false, verbosity = 3, icon = ''} = options;
        this.app = app;
        this.timestamp = timestamp;
        this.verbosity = verbosity;
        this.icon = icon ? icon + '' : '';

    }

    stamp(prefix=null) {
        return `${this.timestamp ? `[${new Date().toISOString()}] ` : ''}${this.icon + (prefix ? '' : '  ')}${prefix ? prefix+' ': ''}${this.app ? `${this.app}` : ''}`;
    }

    banner(msg) {
        if (this.verbosity > 0) console.log(chalk[colors.banner](`${row}\n\n\t${this.stamp()} ${msg}\n\n${row}`))
    }

    error(msg, ...other) {
        if (this.verbosity > 0) console.error(chalk[colors.error](`${this.stamp('❌')} [error] ${msg}`), ...other);
    }

    warn(msg, ...other) {
        if (this.verbosity > 0) console.error(chalk[colors.warn](`${this.stamp('🔺')} [warning] ${msg}`), ...other);
    }

    log(msg, ...other) {
        if (this.verbosity > 1) console.log(chalk[colors.log](`${this.stamp()} ${msg}`), ...other);
    }

    debug(msg, ...other) {
        if (this.verbosity > 2) console.log(chalk[colors.debug](`${this.stamp()} ${msg}`), ...other);
    }
}

module.exports = Output