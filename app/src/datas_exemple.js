user: {
	email: "toto@toto.com"
	emailVerified: false,
	providerData: [
		{
			displayName:n ull
			email: "toto@toto.fr"
			phoneNumber: null
			photoURL: null
			providerId: "password"
			uid: "toto@toto.fr"
		}
	],
	metadata: Uk {
		creationTime: "Sat, 11 Aug 2018 19;16;38 GMT"
	}
	refreshToken: "AGdpqeziIrLtCB8AxvKOmA_u8aYAd-fZhcetjCAKuF6oZb1DTwbaPrrPytbTlmbEXCh1Qq9cHJryCmLI9Z6DBLierbAa0FlCUHf2ENqLARLep2Pty5r2z34Ma9ixNxMj9KNBRzuoMsoNsO7vneBIjJFTMDbX7DUNi-guNQLDVxxvu_FT9-XE80AlHE7yQxyfxyUCu1Ae5a5Lpg8t4ErrkFtS1pv7nCwX3w",
	uid: "L35nWwbPcZdebeyD9EF1wOK79Pg2"
}

{
	userID: {
		profile: {
			name: 'userName',
			uid: 'userUID',
			password: 'userPassword',
			created: 'date',
			last_connexion: 'date',
			verified: 'false'
		},
		datas: [
			{
				year: 2017,
				months: [
					{
						month: 'december',
						income: 'in',
						outcome: 'out',
						inbank: '',
						categories: [
							{
								name: 'cat',
								value: 'value'
							}
						]
					}
				],
				currentMonth: [
					{
						name: 'name',
						category: 'category',
						date: 'date',
						type: 'type',
						value: 'value'
					},
				]
			},
		],
		temp: {
			currentYear: 2018,
			currentMonth: 
		}
		search: {
			categories: [ ...cats ],
			names: [ ...names ]
		}
	}
}

firebase rules : 
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        ".write": "auth != null && auth.uid == $uid"
      }
    }
  }
}