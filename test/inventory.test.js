let inventoryService = require("../services/admin/inventory.admin._service");

describe("update inventory", () => {
    it("should update inventory in database", async () => {
        let updateProduct = await inventoryService.updateIneventory(10, {
            quantity: 15
        });
        console.log(updateProduct)
        expect(updateProduct).toBe(true);
    })
    
})

