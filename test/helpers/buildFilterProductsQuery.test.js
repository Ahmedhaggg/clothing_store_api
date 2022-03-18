let BuildFilterQuery = require("../../helpers/buildFilterQuery");

describe('Name of the group', () => {
    it('should return query', () => {
        let newQuery = new BuildFilterQuery()
        newQuery.setLimit(10);
        newQuery.setOffset(10);
        newQuery.setName("t-shirt");
        newQuery.setCategory("new t-shirt");
        newQuery.setSortBy("createdAt:DESC");
        expect(newQuery.build()).toBe({});
    });
});