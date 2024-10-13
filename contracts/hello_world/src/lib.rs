#![no_std]

use soroban_sdk::{contract, contractimpl, Address, Env, Symbol, token, symbol_short, Vec};


const ADMIN: Symbol = symbol_short!("admin");
const END_TIME: Symbol = symbol_short!("end_time");
const TOKEN: Symbol = symbol_short!("token");

#[contract]
pub struct LeaderboardContract;

#[contractimpl]
impl LeaderboardContract {
    pub fn initialize(env: Env, admin: Address, end_time: u64, token: Address) {
        env.storage().instance().set(&ADMIN, &admin);
        env.storage().instance().set(&END_TIME, &end_time);
        env.storage().instance().set(&TOKEN, &token);
    }
    pub fn deposit(env: Env, from: Address, amount: i128) {
        from.require_auth();
        let end_time: u64 = env.storage().instance().get(&END_TIME).unwrap();
        if env.ledger().timestamp() > end_time {
            panic!("Leaderboard is closed for deposits");
        }
    
        let current_balance = env.storage().persistent().get(&from).unwrap_or(0);
        let new_balance = current_balance + amount;
        env.storage().persistent().set(&from, &new_balance);
    
        // Transfer tokens from user to contract
        let token_client = token::Client::new(&env, &env.storage().instance().get(&TOKEN).unwrap());
        token_client.transfer(&from, &env.current_contract_address(), &amount);
    }

    pub fn get_leaderboard(env: Env) -> Vec<(Address, i128)> {
        let leaderboard = Vec::new(&env);
        // for (key, value) in env.storage().persistent().iter() {
        //     if let Ok(address) = Address::try_from(key) {
        //         if let Some(balance) = value {
        //             leaderboard.push((address, balance));
        //         }
        //     }
        // }
        // leaderboard.sort_by(|a, b| b.1.cmp(&a.1)); // Sort by balance in descending order
        leaderboard
    }

    pub fn withdraw(env: Env, to: Address) {
        let end_time: u64 = env.storage().instance().get(&END_TIME).unwrap();
        if env.ledger().timestamp() <= end_time {
        panic!("Cannot withdraw before the leaderboard ends");
        }
        
        let balance = env.storage().persistent().get(&to).unwrap_or(0);
        if balance == 0 {
        panic!("No balance to withdraw");
        }
        
        env.storage().persistent().set(&to, &0);
        
        // Transfer tokens from contract to user
        let token_client = token::Client::new(&env, &env.storage().instance().get(&TOKEN).unwrap());
        token_client.transfer(&env.current_contract_address(), &to, &balance);
        }
}