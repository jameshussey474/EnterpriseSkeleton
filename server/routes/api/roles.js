const express = require('express');
const router = express.Router();

const dModule = require('../../modules/Roles/roleController');
const authenticationMiddleware = require('../../middleware/authentication.middleware');

router.get('/', authenticationMiddleware.authorization, dModule.GetRoles);
router.post('/', authenticationMiddleware.authorization, dModule.AddRoles);
router.get('/module', authenticationMiddleware.authorization, dModule.GetModule);
router.post('/module', authenticationMiddleware.authorization, dModule.AddModulList);

router.get('/routes', authenticationMiddleware.authorization, dModule.getAccessList);
router.post('/routes', authenticationMiddleware.authorization, dModule.SaveAccessList);
// router
//   .get('/:name',  dModule.getModuleData)
//   .post('/:name', dModule.saveModuleData);

module.exports = router;