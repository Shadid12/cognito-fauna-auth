const faunadb = require('faunadb');
const q = faunadb.query;

const serverClient = new faunadb.Client({ secret: 'fnAESAF_-OACRB4X2lrLe9f859FpjjXfafQkVL1B' });


const registerUser = (email) => {
    return serverClient.query(
        q.Create(
          q.Collection('accounts'),
          { data: { email } },
        )
      );
};

const getUserByEmail = (email) => {
    return serverClient.query(
        q.Get(
          q.Match(q.Index('accounts_by_email'), email)
        )
    );
};

const createRefreshToken = (ref, ttl) => {
    return serverClient.query(
        q.Create(q.Tokens(), {
            instance: q.Ref(q.Collection("accounts"), ref),
            data: {
              type: "refresh"
            },
            ttl: q.TimeAdd(q.Now(), ttl, "seconds"),
        })
    );
};

const createAccessToken = (accountRef, refreshTokenRef, ttl) => {
    return serverClient.query(
        q.Create(q.Tokens(), {
            instance: q.Ref(q.Collection("accounts"), accountRef),
            data: {
              type: 'access',
              refresh:  refreshTokenRef
            },
            ttl: q.TimeAdd(q.Now(), ttl, 'seconds')
        })
    );
};


module.exports = {
    registerUser,
    createAccessToken,
    createRefreshToken,
    getUserByEmail
}