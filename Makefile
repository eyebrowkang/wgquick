.PHONY: wasm dev build clean

wasm:
	GOOS=js GOARCH=wasm go build -o web/public/main.wasm ./cmd/wasm

dev: wasm
	pnpm --dir web dev

build: wasm
	pnpm --dir web run build

clean:
	rm -rf web/dist web/public/main.wasm
