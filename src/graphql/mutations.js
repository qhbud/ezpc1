/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBuild = /* GraphQL */ `
  mutation CreateBuild(
    $input: CreateBuildInput!
    $condition: ModelBuildConditionInput
  ) {
    createBuild(input: $input, condition: $condition) {
      id
      gpu
      gpuCost
      cpu
      cpuCost
      cooler
      coolerCost
      ram
      ramCost
      numram
      drive
      driveCost
      numstorage
      mobo
      moboCost
      psu
      psuCost
      case
      caseCost
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateBuild = /* GraphQL */ `
  mutation UpdateBuild(
    $input: UpdateBuildInput!
    $condition: ModelBuildConditionInput
  ) {
    updateBuild(input: $input, condition: $condition) {
      id
      gpu
      gpuCost
      cpu
      cpuCost
      cooler
      coolerCost
      ram
      ramCost
      numram
      drive
      driveCost
      numstorage
      mobo
      moboCost
      psu
      psuCost
      case
      caseCost
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteBuild = /* GraphQL */ `
  mutation DeleteBuild(
    $input: DeleteBuildInput!
    $condition: ModelBuildConditionInput
  ) {
    deleteBuild(input: $input, condition: $condition) {
      id
      gpu
      gpuCost
      cpu
      cpuCost
      cooler
      coolerCost
      ram
      ramCost
      numram
      drive
      driveCost
      numstorage
      mobo
      moboCost
      psu
      psuCost
      case
      caseCost
      createdAt
      updatedAt
      __typename
    }
  }
`;
