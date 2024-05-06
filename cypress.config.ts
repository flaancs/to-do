import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        env: {
            CYPRESS_SESSION_TOKEN:
                "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiUzhGVElrTmE0U3JVUDVKWld3ZTY0MDhSRlJDOTFVb3JRdWJVaFhHLXFiNVBqNEdXUkhaQ0ZaajVERXFzeENTdmFvelNTb25Vd3VaQXhtOENFWmpLRUEifQ..q2qJP_k-0EJBK98JrOor3Q.BQP1KlXUXU0PhEO-ZHsiF-MRksM_bpg0ODXyaooC7t2v0qir5bBCx5sGlKcD0sRuKwC-soRBH-Xc5jZcL5AguY3bq7QaOkFeO0PPQqzxm87gI16DL5T-APu-xDO2ri_QGjFBsucdcGNTYZ23CPZOTDoupiodP6nj4wtRccoFcXObmy8JOIY3rkpLSWDYEFBjdTcuUeJAMnqjE7u1QLKduE-dNJx4lnonb5p9fJ8LPkgLnuIZ1rfS37S1iEGckuex7YlMne0AyE18A6T22kJtx3aCR7PKKqN7qKkrg6ppGThYPKKx-xHuPlfp1vJ89uJZ1CDI7lMiI6CbwqdNejoTq9ZYwsQm36PQSpFJsVaYzc4nCezyCgs_BlcKLiGVBM8m16qjCFjiVPt-Uq0Q4qlXYwIH8mQ6jRHNGBxrdDp-3Dg6qVuCSCpdSyfMsHUwuLXhTRee1pYPB154vCDdmDPvvkrBLhwbE7Nm8nahLDvd3zE.Ugwn8W0cdV2r34ke8iQ_G82yQYxs1xu-tYv_7g4I80c",
            CYPRESS_SESSION:
                ".eJxVj81OhEAMx99lzi4w38BNE018ABOzF9IdCoy4TELLqtnsuzsYL3tr-_t_pFfBSBxSmiOKVnyldcZePIhuwW_Oh5KQOS4jlRBC2hYu8Qzxk8qsIUodtcZWXprGKe2t8VaJ9iqYRCvzVVpTN66onfFK3XIqbDx1G-HaxT6na-mdVZW4IycIMy47Jlx4_Sk2zoXFLiie9_LHPD39i-6cE9CUbVBD0AHBeFABKrRgAlYoe9S1hFNevQteorUKmwbtYJ0bpB4qbc1J-WF_7a_5QFufcuDl9f3lbTyeP449ZQiB4wXTOmbEqU8HG8XtF9JzaPQ:1s3gq0:9dxmSyUiD9_CSUSRRpKEca4svY7UN4qgyA9-eUIUhf8",
        },
        baseUrl: "http://localhost:3000",
        chromeWebSecurity: false,
    },
});
