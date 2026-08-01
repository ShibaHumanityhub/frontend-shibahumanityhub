// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title hopeseed (HOPESEED)
 * @notice Companion mercy token to Mr. Nibbles ($NIBBLES) on Shibarium.
 *         Mirrors the NIBBLES tax pattern used on-chain:
 *         - 1,000,000,000 supply (18 decimals)
 *         - 2% total tax on transfers (200 basis points)
 *         - 1% to burn address (0x...dEaD)
 *         - 1% to treasury (impact wallet)
 *
 * Deploy on Shibarium mainnet (chainId 109).
 * Constructor arg: treasury address (use your project treasury / same as NIBBLES if desired).
 */
contract HopeSeed {
    string public constant name = "hopeseed";
    string public constant symbol = "HOPESEED";
    uint8 public constant decimals = 18;

    uint256 public totalSupply;

    address public owner;
    address public treasury;

    /// @dev 200 = 2.00% total tax (basis points out of 10_000)
    uint256 public constant TAX_PERCENT = 200;

    address public constant BURN_ADDRESS = 0x000000000000000000000000000000000000dEaD;

    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "not owner");
        _;
    }

    /**
     * @param _treasury Impact / project treasury receiving 1% of each taxed transfer.
     *                 Full supply is minted to the deployer (msg.sender).
     */
    constructor(address _treasury) {
        require(_treasury != address(0), "treasury=0");
        owner = msg.sender;
        treasury = _treasury;

        uint256 supply = 1_000_000_000 * 10 ** uint256(decimals);
        totalSupply = supply;
        balanceOf[msg.sender] = supply;
        emit Transfer(address(0), msg.sender, supply);
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _transfer(msg.sender, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        if (allowed != type(uint256).max) {
            require(allowed >= amount, "allowance");
            unchecked {
                allowance[from][msg.sender] = allowed - amount;
            }
        }
        _transfer(from, to, amount);
        return true;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "owner=0");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }

    function setTreasury(address newTreasury) external onlyOwner {
        require(newTreasury != address(0), "treasury=0");
        treasury = newTreasury;
    }

    function _transfer(address from, address to, uint256 amount) internal {
        require(to != address(0), "to=0");
        require(balanceOf[from] >= amount, "balance");

        // No tax on mint path (already handled). Tax normal transfers.
        // Optional: skip tax for owner/treasury to move ops funds cleanly.
        bool takeTax = from != owner && to != owner && from != treasury && to != treasury
            && to != BURN_ADDRESS;

        if (!takeTax || TAX_PERCENT == 0) {
            unchecked {
                balanceOf[from] -= amount;
                balanceOf[to] += amount;
            }
            emit Transfer(from, to, amount);
            return;
        }

        // 2% total: 1% burn + 1% treasury (100 bps each)
        uint256 taxTotal = (amount * TAX_PERCENT) / 10_000;
        uint256 burnAmt = taxTotal / 2;
        uint256 treasAmt = taxTotal - burnAmt;
        uint256 sendAmt = amount - taxTotal;

        unchecked {
            balanceOf[from] -= amount;
            balanceOf[to] += sendAmt;
            balanceOf[BURN_ADDRESS] += burnAmt;
            balanceOf[treasury] += treasAmt;
        }

        emit Transfer(from, to, sendAmt);
        if (burnAmt > 0) emit Transfer(from, BURN_ADDRESS, burnAmt);
        if (treasAmt > 0) emit Transfer(from, treasury, treasAmt);
    }
}
