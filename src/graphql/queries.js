/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getBuild = /* GraphQL */ `
  query GetBuild($id: ID!) {
    getBuild(id: $id) {
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
export const listBuilds = /* GraphQL */ `
  query ListBuilds(
    $filter: ModelBuildFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBuilds(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
