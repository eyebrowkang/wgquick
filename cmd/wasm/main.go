package main

import (
    "strings"
    "syscall/js"

    "golang.zx2c4.com/wireguard/wgctrl/wgtypes"
)

func generateKeyPair(this js.Value, args []js.Value) interface{} {
    privateKey, err := wgtypes.GeneratePrivateKey()
    if err != nil {
        return map[string]interface{}{
            "ok":      false,
            "message": err.Error(),
        }
    }

    publicKey := privateKey.PublicKey()

    return map[string]interface{}{
        "ok":         true,
        "privateKey": privateKey.String(),
        "publicKey":  publicKey.String(),
    }
}

func generatePreSharedKey(this js.Value, args []js.Value) interface{} {
    key, err := wgtypes.GenerateKey()
    if err != nil {
        return map[string]interface{}{
            "ok":      false,
            "message": err.Error(),
        }
    }

    return map[string]interface{}{
        "ok":  true,
        "psk": key.String(),
    }
}

func publicKeyFromPrivate(this js.Value, args []js.Value) interface{} {
    if len(args) == 0 {
        return map[string]interface{}{
            "ok":      false,
            "message": "private key is required",
        }
    }

    input := strings.TrimSpace(args[0].String())
    if input == "" {
        return map[string]interface{}{
            "ok":      false,
            "message": "private key is empty",
        }
    }

    privateKey, err := wgtypes.ParseKey(input)
    if err != nil {
        return map[string]interface{}{
            "ok":      false,
            "message": "invalid private key",
        }
    }

    publicKey := privateKey.PublicKey()

    return map[string]interface{}{
        "ok":        true,
        "publicKey": publicKey.String(),
    }
}

func main() {
    js.Global().Set("wgquickGenerateKeyPair", js.FuncOf(generateKeyPair))
    js.Global().Set("wgquickGeneratePreSharedKey", js.FuncOf(generatePreSharedKey))
    js.Global().Set("wgquickPublicKeyFromPrivate", js.FuncOf(publicKeyFromPrivate))

    select {}
}
