let productDiscountService = require("../services/admin/productDiscount.admin._service");

describe("update discount", () => {

    it("update discount in DB should return true", async () => {
        let updateDiscount = await productDiscountService.updateDiscount(10, {
            percent: 10,
            description: "new year discount",
            expiresin: "2022-8-6"
        });
        expect(updateDiscount).toBe(true);
    })
    
})


describe("create discount", () => {

    
     it("create discount in DB should return object", async () => {
        let newDiscount = await productDiscountService.createDiscount({
            percent: 10,
            description: "new year discount",
            expiresin: "2022-8-6",
            productId: "69a7b557-3c4c-4f2b-9b07-21e0c7ebf4ff"
        });
        expect(newDiscount).toBeDefined();
    })
    
})


describe("delete discount", () => {

     it("delete discount in DB should return true", async () => {
        let deleteDiscount = await productDiscountService.deleteDiscount(12);
        expect(deleteDiscount).toBe(true);
    })
    
})