# cashapp

Implementation of a Cash App client library for NodeJS, plus CLI tool.

## Installation

```sh
npm install -g
```

Installs a `cashapp` CLI program on the system

## Usage

The complete Cash App API is available for usage, where each subcommand is in hyphen-case, corresponding to the API method you want to call, with a few extra convenience subcommands for easier usage of a Cash App account.

A CashAppClient instance is created when the program is invoked, retrieving the serialized session from ~/.cashapp/session.json

The subcommand you use with the CLI tool will be converted to camelCase then the corresponding method on the CashAppClient instance is invoked, with the object passed in as an argument being the complete set of --long-options passed in with the command, also converted to camelCase. A long option with -from-file appended to the end of it will treat its argument as a filename and load it in the library as a Buffer type. In some cases the Buffer will be converted to a utf8 string, but for most endpoints where supplying a file as an option, it will be passed in as a Buffer and encoded appropraitely.

The Cash App API uses protobuf across the board and is exposed over HTTP/2. The protobuf schema is generated by running the `bin/parse-protobuf.js` program, which is a parser generator that parses smali disassembly and outputs proto3 syntax.

Use the `cashapp init` subcommand to acquire a Cash App session from the API. The headers for device information, device key associated with the spoofed phone, and session JWT is saved to disk.

Use the `cashapp flow` subcommand to create a new Cash-Flow-Token, when beginning the workflow for one of the Cash App scenarios.

Use the `cashapp repack -i cash.apk -o out.apk` command to repack a Cash App apk with the spoofed session, to be used on an Android device. Requires apktool on the system. You will also have to zipalign/sign the apk. It is simplest to use uber-apk-signer.jar for this.

Use the `cashapp save some-name` to save the session in `~/.cashapp/some-name.json`

Use the `cashapp load some-name` to load the session from `~/.cashapp/some-name.json` and begin using it by CLI

Use the `cashapp get-profile` command to acquire the `profileToken` for a live session. Will be saved to the current session.json. This is required before doing anything with an account, and it should be called after logging in a session.

Example account creation:

```sh

cashapp init
cashapp register-email --email-address someemail@gmail.com
cashapp verify-email --email-address someemail@gmail.com --verification-code 774838
cashapp skip-blocker --blocker-descriptor-id card_blocker
cashapp set-name --first-name Paul --last-name Revere
cashapp set-cashtag --cashtag paulrevere22
cashapp set-address --postal-code 20035
cashapp get-profile
```

List instruments associated wiwth account (cards, cash, BTC):

```sh

cashapp get-instruments
```

The instrument token can be used with the initiate-payment method

Example send $50 (dollar amounts are always expressed in cents):

```sh

cashapp pay --cashtag johnhancock22 --instrument-token C_02es02 --note 'paid you with the CLI!' --amount 5000

```

Example send someone a note via the Request feature

```sh

cashapp initiate-payment --orientation 2 --amount 100 --note 'yo call me, the British are here' --cashtag johnhancock22
