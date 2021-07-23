import makeEntity from "./index";

describe("store", () => {
  const fakeEntity = { Name: "Some store" };

  it("can have an EntityId", () => {
    const withId = { ...fakeEntity, EntityId: "abc123" };

    expect(() => makeEntity(withId)).toThrow(
      "Entity must have valid EntityId."
    );

    const noId = { ...fakeEntity, EntityId: undefined };
    expect(() => makeEntity(noId)).not.toThrow();
  });

  it("can create an EntityId", () => {
    const noId = { ...fakeEntity, EntityId: undefined };
    const entity = makeEntity(noId);
    expect(entity.getEntityId()).toBeDefined();
  });
});
