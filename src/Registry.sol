// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { Ownable } from "lib/openzeppelin-contracts/contracts/access/Ownable.sol";

/**
 * @title Culendar shielded address registry
 */
contract Registry is Ownable {
    /// @dev Maps a native address to a shielded address.
    mapping(address => bytes) public shieldedByNativeAddresses;
    /// @dev Maps a shielded address to a name.
    mapping(bytes => bytes) public names;
    /// @dev Maps a name hash to a shielded address.
    mapping(bytes32 => bytes) public shieldedAddressesByNames;

    event Registered(
        address indexed filterNativeAddress,
        address nativeAddress,
        bytes indexed filterShieldedAddress,
        bytes shieldedAddress,
        bytes indexed filterName,
        bytes name
    );
    
    constructor() Ownable(msg.sender) {}

    /**
     * Looks up a shielded address by a native address.
     * @param _nativeAddress Native address
     * @return _shieldedAddress Shielded address
     */
    function shieldedAddressOf(address _nativeAddress)
        public
        view
        returns (bytes memory _shieldedAddress)
    {
        return shieldedByNativeAddresses[_nativeAddress];
    }

    /**
     * Looks up a shielded address by a name.
     * @param _name .bay name
     * @return _shieldedAddress Shielded address
     */
    function shieldedAddressOfName(bytes calldata _name)
        external
        view
        returns (bytes memory _shieldedAddress)
    {
        return shieldedAddressOfNameHash(keccak256(_toLower(_name)));
    }

    /**
     * Looks up a shielded address by a name hash.
     * @param _name Name hash
     * @return _shieldedAddress Shielded address
     */
    function shieldedAddressOfNameHash(bytes32 _name)
        public
        view
        returns (bytes memory _shieldedAddress)
    {
        return shieldedAddressesByNames[_name];
    }

    /**
     * Looks up a name by a shielded address.
     * @param _shieldedAddress Shielded address
     * @return _name .bay name
     */
    function nameOfShieldedAddress(bytes calldata _shieldedAddress)
        external
        view
        returns (bytes memory _name)
    {
        return names[_shieldedAddress];
    }

    /**
     * Looks up a name by a native address.
     * @param _nativeAddress Native address
     * @return _name .bay name
     */
    function nameOfNativeAddress(address _nativeAddress)
        external
        view
        returns (bytes memory _name)
    {
        return names[shieldedAddressOf(_nativeAddress)];
    }

    /**
     * Registers a shielded account including a name.
     * @param _shieldedAddress Shielded address
     * @param _name .bay name
     */
    function register(bytes calldata _shieldedAddress, bytes calldata _name)
        external
    {
        require(
            _shieldedAddress.length == 32,
            "Registry::register: invalid shielded address"
        );
        if (_name.length > 0) {
            require(
                _name.length <= 255,
                "Registry::register: name must be max 255 chars"
            );
            require(
                _name.length >= 3,
                "Registry::register: name must be min 7 chars"
            );
        }
        bytes memory _lower = _toLower(_name);
        bytes32 _nameKey = keccak256(_lower);
        require(
            shieldedAddressesByNames[_nameKey].length == 0,
            "Registry::register: name already registered'"
        );

        shieldedByNativeAddresses[msg.sender] = _shieldedAddress;

        emit Registered(
            msg.sender,
            msg.sender,
            _shieldedAddress,
            _shieldedAddress,
            _lower,
            _lower
        );
    }

    function _toLower(bytes memory _str)
        internal
        pure
        returns (bytes memory _lower)
    {
        _lower = new bytes(_str.length);
        for (uint256 i = 0; i < _str.length; i++) {
            if (uint8(_str[i]) >= 65 && uint8(_str[i]) <= 90) {
                _lower[i] = bytes1(uint8(_str[i]) + 32);
            } else {
                _lower[i] = _str[i];
            }
        }
    }
}
