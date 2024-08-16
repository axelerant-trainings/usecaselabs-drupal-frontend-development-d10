# Use Case Labs

## Git Setup
> Please note that the following actions need to be performed only once. In future, the same setup maybe useful while you setup other projects.

Verify if username in Git is set or follow [Setting your username in Git](https://docs.github.com/en/get-started/getting-started-with-git/setting-your-username-in-git).
```
git config user.name
```

Verify if email in Git is set or follow [Setting your commit email address](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/setting-your-commit-email-address#setting-your-commit-email-address-in-git).
```
git config user.email
```

Verify if ssh-keys are set or follow [Generate new SSH Keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) and [Adding SSH Key to Github](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).
```
ls ~/.ssh
```

## Multi-site local Setup
NOTE : This step needs to be followed only if you already have the default site settled up and working. If not, please refer to the Local setup section.

After switching/merging to this current branch i.e. LDT-762 where Multi-site setup is configured, please run below commands :
```
ddev restart
ddev drush si --uri=front2
ddev drush entity:delete shortcut_set --uri=front2
ddev drush cset system.site uuid 3e9cc1f7-46aa-43c2-bdc3-8afab813dc62 --uri=front2
ddev drush cim -y --uri=front2
ddev drush cr --uri=front2
Vist : https://front2.ddev.site/
ddev drush uli --uri=front2

```

## Local Setup
Clone this repository ([learn more](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository))

```
git clone <ssh-link>
```

Run below commands
```
ddev start
ddev composer install
ddev drush si
ddev drush entity:delete shortcut_set
ddev drush cset system.site uuid 3e9cc1f7-46aa-43c2-bdc3-8afab813dc62
ddev drush cim -y
ddev drush cr
ddev launch $(ddev drush uli)

```

You will be able see your local site ready for further contributions.

## Admin Login
Use below command to get a one-time login link for admin user.

```
ddev drush uli
```
