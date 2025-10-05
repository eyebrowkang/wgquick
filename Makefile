.PHONY: wasm dev build clean

WASM_FLAGS := -trimpath -ldflags="-buildid="

wasm:
	GOOS=js GOARCH=wasm go build $(WASM_FLAGS) -o web/public/main.wasm ./cmd/wasm

dev: wasm
	pnpm --dir web dev

build: wasm
	pnpm --dir web run build

clean:
	rm -rf web/dist web/public/main.wasm
