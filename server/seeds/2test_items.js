/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // id, userID, itemName, description, quantity
  await knex('items').del()
  await knex('items').insert([
    {
      userID: 1,
      itemName: 'Precision Screwdriver Set',
      description: 'Handheld tool specifically designed for working with small screws commonly found in computers, electronics, and other delicate devices. These screwdrivers typically have a slim handle and a narrower, more precise metal shaft compared to standard screwdrivers. The handle may have a rotating cap, which allows for better control and ease of use when working with tiny screws that require precision. The metal shaft ends in a specially shaped tip, which comes in various sizes and types to match the different screw heads found in electronic devices, such as Phillips, flathead, Torx, and pentalobe.',
      quantity: 3
    },
    {
      userID: 1,
      itemName: 'Dell XPS 15',
      description: '15-inch development laptop with 1TB hardrive and 16GB memory',
      quantity: 5
    },
    {
      userID: 2,
      itemName: "Dell 34' WQHD Monitor",
      description: '3440x1440 ultra wide screen monitor, 144Hz refresh rate, HDMI 2.0, DisplayPort 1.4',
      quantity: 10
    },
    {
      userID: 2,
      itemName: 'HDMI 2.0 Cables',
      description: '18 Gbps bandwidth capable of 4K resolution up to 60fps. Capable of dual vidoe stream for PIP or two independent video streams. Backwards compatible with HDMI 1.4. Ethernet support ready.',
      quantity: 20
    }
  ]);
};
