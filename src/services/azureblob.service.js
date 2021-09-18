// THIS IS SAMPLE CODE ONLY - NOT MEANT FOR PRODUCTION USE
import { BlobServiceClient } from "@azure/storage-blob";

const sasToken =
  process.env.storagesastoken ||
  "sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2021-12-01T14:42:13Z&st=2021-07-21T06:42:13Z&spr=https&sig=tUr%2Ft%2Fw10mP%2FCE7r3DxQ8csZkFRVFFykeqGlT6r9BsM%3D"; // Fill string with your SAS token

// const containerName = `matierials`;

export const containers = {
  learnmats: `matierials`,
  submissions: "submissions",
  attachments: "attachments",
};
const storageAccountName = process.env.storageresourcename || "khub"; // Fill string with your Storage resource name

// Feature flag - disable storage feature to app if not configured
export const isStorageConfigured = () => {
  return !(!storageAccountName || !sasToken);
};

export const getLearnMatUrl = (filename) => {
  return `https://${storageAccountName}.blob.core.windows.net/${containers.learnmats}/${filename}`;
};

export const getFileUrl = (filename, cont) => {
  return `https://${storageAccountName}.blob.core.windows.net/${cont}/${filename}`;
};

// return list of blobs in container to display
// const getBlobsInContainer = async (containerClient) => {
//   const returnedBlobUrls = [];

//   // get list of blobs in container
//   // eslint-disable-next-line
//   for await (const blob of containerClient.listBlobsFlat()) {
//     // if image is public, just construct URL
//     returnedBlobUrls.push(
//       `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
//     );
//   }

//   return returnedBlobUrls;
// };

const createBlobInContainer = async (containerClient, file) => {
  // create blobClient for container
  const filename = file.uid + "-nm-" + file.name;
  const blobClient = containerClient.getBlockBlobClient(filename);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);

  await blobClient.setMetadata({ UserName: "lakshan" });
  return filename;
};

const uploadFileToBlob = async (file, containerName) => {
  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);

  // upload file
  const filename = await createBlobInContainer(containerClient, file);
  // console.log(filename);

  return filename;
  // get list of blobs in container
  // return getBlobsInContainer(containerClient);
};
// </snippet_uploadFileToBlob>

export const deleteBlobFiile = async (filename, containerName) => {
  // if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );
  // get Container - full public read access
  const containerClient = blobService.getContainerClient(containerName);
  // delete file
  const delteData = await containerClient.deleteBlob(filename);
  // console.log(filename);

  return delteData;
};

export default uploadFileToBlob;
