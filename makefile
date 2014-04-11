HR = \n---------------------------------------------
HEADER = ---------------------------------------------\n _____  _    _ _       _____         _____   \n|  __ \| |  | | |     / ____|  /\   |  __ \  \n| |__) | |  | | |    | (___   /  \  | |__) | \n|  ___/| |  | | |     \___ \ / /\ \ |  _  /  \n| |    | |__| | |____ ____) / ____ \| | \ \  \n|_|     \____/|______|_____/_/    \_\_|  \_\ \n\n---------------------------------------------
CHECK=\033[32m✔\033[39m

BUILD := build

BREW = $(shell which brew)
BOWER = $(shell which bower)
GRUNT = $(shell which grunt)
NODE = $(shell which node)
XCODE = $(shell pkgutil --pkg-info=com.apple.pkg.CLTools_Executables)

build:
	@ echo "${HEADER}"
	
	@ echo "Installing Composer and its dependencies...${HR}\n"
	@ sudo curl -sS https://getcomposer.org/installer | php -d detect_unicode=Off
	@ sudo php composer.phar install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling XCode Command Line Tools...${HR}\n"
ifeq (${XCODE}, )
	xcode-select --install
else
	@ echo "Command line tools are already installed."
endif

	@ echo "${HR}\nInstalling Homebrew and its dependencies...${HR}\n"
ifeq (${BREW}, )
	ruby -e "$$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
else
	@ echo "Homebrew v$(shell brew --version) is already installed.\n"
endif
	@ brew install phantomjs
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Node & NPM...${HR}\n"
ifeq (${NODE}, )
	brew install node
else
	@ echo "Node $(shell node --version) is already installed."
endif
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Bower and its dependencies...${HR}\n"
ifeq (${BOWER}, )
	@ sudo npm install -g bower
else
	@ echo "Bower v$(shell bower --version) is already installed."
endif
	@ bower install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Grunt and its libraries...${HR}\n"
ifeq (${GRUNT}, )
	@ sudo npm install -g grunt-cli
else
	@ echo "Grunt is already installed.\n"
endif
	@ npm install
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nInstalling Git hooks...${HR}"
	@ cp hooks/* .git/hooks/
	@ chmod -R u+x .git/hooks/*
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nCompiling the stylesheets...${HR}\n"
	@ grunt sass:dev
	@ echo "${CHECK} Done\n"

	@ echo "${HR}\nRunning the first build...${HR}\n"
	@ grunt build
	@ echo "\n${CHECK} Done\n"

	@ echo "Run 'grunt' to start the documentation server and watch for Sass changes."

clean:
	@ echo "${HEADER}"
	@ echo "Removing Composer packages...${HR}"
	@ rm -rf vendor/*
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nRemoving front-end libraries...${HR}"
	@ rm -rf libs/*
	@ echo "\n${CHECK} Done"

	@ echo "${HR}\nRemoving GIT hooks...${HR}"
	@ rm -rf .git/hooks/*
	@ echo "\n${CHECK} Done\n"	
