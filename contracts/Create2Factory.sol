// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Create2Factory {
    event Deployed(address addr, uint256 salt);

    function deploy(bytes32 salt, bytes memory bytecode) public returns (address) {
        address addr;
        assembly {
            addr := create2(0, add(bytecode, 0x20), mload(bytecode), salt)
            if iszero(extcodesize(addr)) {
                revert(0, 0)
            }
        }

        emit Deployed(addr, uint256(salt));
        return addr;
    }

    function computeAddress(bytes32 salt, bytes memory bytecode) public view returns (address) {
        return address(uint160(uint(keccak256(abi.encodePacked(
            bytes1(0xff),
            address(this),
            salt,
            keccak256(bytecode)
        )))));
    }
}