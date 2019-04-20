pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol';
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";

contract FTT is ERC20, ERC20Detailed, ERC20Burnable {
    constructor() ERC20Detailed('FTT', 'FTX Token', 18) public {
        _mint(msg.sender, 350_000_000 * 10 ** 18);
    }
}
