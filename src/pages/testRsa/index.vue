<template>
    <div>list4</div>

</template>
<script>
export default {
    data() {
        return {
            normalStr:'Hello world',
            after:'',
            publicKey:`-----BEGIN PUBLIC KEY-----
            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDe9wW1r64CS/uiRVUTyWNPBICv
            Omk890SOSVZBYB1SbWa1oRX69UfhzzMVZaFugqwGOS61sTfmVEZpn4YVgq1UZkIN
            WOY0Te82CfAGkg4XEfbLYaJwCYbDT5sAA6MgupjrRkyGxAk/J0fD6zUMv5ryD2PX
            ZRbzIBrfExvdCbHX1wIDAQAB
            -----END PUBLIC KEY-----
            `,
            privateKey:`-----BEGIN PRIVATE KEY-----
            MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAN73BbWvrgJL+6JF
            VRPJY08EgK86aTz3RI5JVkFgHVJtZrWhFfr1R+HPMxVloW6CrAY5LrWxN+ZURmmf
            hhWCrVRmQg1Y5jRN7zYJ8AaSDhcR9sthonAJhsNPmwADoyC6mOtGTIbECT8nR8Pr
            NQy/mvIPY9dlFvMgGt8TG90JsdfXAgMBAAECgYEAldpydPU5P4PwANUWZDETVNVS
            4/KfLoGGCxeRKGk/69lpkaNNkZjvEf5fd/8Ra6PZmGkwUp9kUaLMnErCJIzqjrDt
            dGW2GjRN5xIPh5FNrCdthd4vcdOP3fVT2Xn4O5EJ9vHHaY1ZTtknMPpzJVMX5yTV
            cyVJhNM2gR3L0w90htECQQDxaKeAup8PbyjWcR0GeEZLT/2p0MwPI6IfaXYkr1Si
            9BAXyho85TmsAwQnWRfqNg7mpFIki9Lv6o/K+hDhCvq/AkEA7HD73LNf2l12W37+
            7bCfniNgLnT38w3mW7tsRwL4HFTF6U3hu8lQE1UyOmk/LFKMl2MgsGcUR/OzVUjs
            rlRg6QJBAJ7/KrNiNrjXobH7Nf644LNhr9RUrNGbyn+d2i43PCtHTAIfHkDVSLK+
            GdJAn7umdxH5UBC59ugFOUeag9t0e8kCQGIyIkfsrzhvbIJfYdyxZ/kzU/S3W2q0
            MSGT20o6r3SEuJVGZSOqXflJfszHfRcZSY5t+tuIU+H2ElqvKKzWGlECQQDmNc1n
            TD/MibDKpC+EnfQXzwdX4dfs8EsPyCyrSECNFZ3ou1RmkQJKkesHs4yJNmJm8Axq
            7bMSug98gG5VlDa+
            -----END PRIVATE KEY-----
            `,
        };
    },
    created(){
        let that = this;
        // 实例化一个JSEncrypt对象
        let jse = new that.$jsEncrypt();
        jse.setPublicKey(this.publicKey);
        // 设置需要加密的字符串
        let encrypted = jse.encrypt('Hello, world')
        console.log(encrypted);
        jse.setPrivateKey(this.privateKey);
        // 解密加密过的字符串
        let decrypted = jse.decrypt(encrypted)
        console.log(decrypted);
    }
};
</script>
<style lang="less">
</style>