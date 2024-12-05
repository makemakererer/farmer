# Blaze Bot

This bot is designed to automate some activeties on the Blaze testnet network.

## Features

- Claiming all possible tokens for trading and swap.
- Swapping tokens in random order on random amount and random times.

## Requirements

- Git v2.13 or later
- Node.js v16.14.0 or later
- Private keys.
- Proxies. You can get quality proxies [here](https://ca.internetspace.com.ua) (recommended).

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/makemakererer/farmer.git
    ```

2. Navigate to the project directory:

    ```bash
    cd farmer
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

## Configuration

In the `/data` folder, you will find three important files:

1. **`private_keys.txt`**: You need to list your private keys here, **one private key per line**. These private keys will be used for playing games.

    Example of `private_keys.txt`:
    ```
    0x123abc456def789...
    0xabcdef123456789...
    ```

2. **`proxies.txt`**: This file should contain a list of proxies, **one per line**, in the following format:

    ```
    http://username:password@hostname:port
    ```

    Example of `proxies.txt`:
    ```
    http://abc123:xyz789@198.51.100.42:8080
    http://abc123:xyz789@198.51.100.42:8080
    ```

5. **`Config`**: File `config.ts` in `utils` folder contains all the parameters for the bot such as delay between requests, min and max delay between errors, provider url, etc..

## Running the Script

After configuring the necessary files, you can run the script as follows:

1. Start the script with command:

    ```bash
    npm run start-bot
    ```


## Notes

- The bot is designed to run indefinitely until the user stops it or wallets is over. One wallet can claim tokens only 4 times on day.
- The bot spends about 3 minutes on one account.


