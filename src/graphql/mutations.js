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
      cpu
      cooler
      ram
      numram
      drive
      numstorage
      mobo
      psu
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
      cpu
      cooler
      ram
      numram
      drive
      numstorage
      mobo
      psu
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
      cpu
      cooler
      ram
      numram
      drive
      numstorage
      mobo
      psu
      createdAt
      updatedAt
      __typename
    }
  }
`;
