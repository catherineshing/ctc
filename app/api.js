var data = {
    items: [
        {
            id: 'id1',
            title: 'title1',
            description: 'description1',
            filename: '1.jpg'
        },
        {
            id: 'id2',
            title: 'title2',
            description: 'description2',
            filename: '2.jpg'
        },
        {
            id: 'asdfqwerasdfqwer',
            title: 'asdfqwer',
            description: 'asdfqwerasdfaqwer',
            filename: '2.jpg'
        }
    ]
};

function getItems(req, res) {
    res.json({items: data.items});
}

function addItem(req, res) {
    console.log('addItem: ' + JSON.stringify(req.body));
    data.items.push(req.body);
    res.json(req.body);
}

module.exports = function(app) {

    app.get('/api/items', getItems);
    app.post('/api/items', addItem);

};
