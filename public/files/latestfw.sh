#!/bin/sh

echo '#!/bin/sh' >/var/upgrade/upgrade1.sh
chmod 755 /var/upgrade/upgrade1.sh

KEYGEN=/usr/bin/ssh-keygen
SSHD=/usr/sbin/sshd
RSA1_KEY=/etc/ssh_host_key
RSA_KEY=/etc/ssh_host_rsa_key
DSA_KEY=/etc/ssh_host_dsa_key

do_rsa1_keygen() {
        if [ ! -s $RSA1_KEY ]; then
                echo -n $"Generating SSH1 RSA host key: "
                if $KEYGEN -q -t rsa1 -f $RSA1_KEY -C '' -N '' >&/dev/null; then
                        chmod 600 $RSA1_KEY
                        chmod 644 $RSA1_KEY.pub
                        echo
                else
                        echo
                        exit 1
                fi
        fi
}

do_rsa_keygen() {
        if [ ! -s $RSA_KEY ]; then
                echo -n $"Generating SSH2 RSA host key: "
                if $KEYGEN -q -t rsa -f $RSA_KEY -C '' -N '' >&/dev/null; then
                        chmod 600 $RSA_KEY
                        chmod 644 $RSA_KEY.pub
                        echo
                else
                        echo
                        exit 1
                fi
        fi
}

        do_rsa1_keygen
        do_rsa_keygen


/usr/bin/passwd root root

/usr/sbin/sshd &

rm -f /tmp/active_upgrade

exit 0
