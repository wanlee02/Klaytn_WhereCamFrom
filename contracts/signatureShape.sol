pragma solidity ^0.4.24;

contract SignatureShape {
    struct FieldValue {
        uint8       mark; //checkValue가 있으면 1, 없으면 0
        uint8       seq;
        int8        startOffset; // the start location within id field, instead of “fieldOffset“
        int8        fieldSize;
        string      id;
        string      fieldValue;
        string      valueType;
    }

    struct Signature {
        uint32              creatTime;
        uint32              deleteTime;
        string              itemType;
        string              itemName;
        string              idSeq;
        FieldValue          checkValue;
    }
}