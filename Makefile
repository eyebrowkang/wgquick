.PHONY: wasm dev build clean

WASM_ENV := GOOS=js GOARCH=wasm GODEBUG=randautoseed=0
WASM_FLAGS := -trimpath -buildvcs=false -ldflags="-buildid="

wasm:
	$(WASM_ENV) go build $(WASM_FLAGS) -o web/public/main.wasm ./cmd/wasm

dev: wasm
	pnpm --dir web dev

build: wasm
	pnpm --dir web run build

clean:
	rm -rf web/dist web/public/main.wasm
