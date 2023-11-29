import {Router, Request, Response} from 'express';
import * as lenderController from "../controllers/lenderController";
import {body} from 'express-validator';
import {TokenMiddleware} from "../middlewares/TokenMiddleware";

const lenderRouter: Router = Router();

/**
 @usage : to get all contacts
 @method : GET
 @params : no-params
 @url : http://localhost:9000/contacts
 */
lenderRouter.get("/", TokenMiddleware, async (request: Request, response: Response) => {
    await lenderController.getAllLenders(request, response);
});


/**
 @usage : get a contact
 @method : GET
 @params : no-params
 @url : http://localhost:9000/contacts/:contactId
 */
lenderRouter.get("/:contactId", TokenMiddleware, async (request: Request, response: Response) => {
    await lenderController.getLender(request, response);
});


/**
 @usage : create a contact
 @method : POST
 @params :name, imageUrl, mobile, address,loan_Amount,disb_Date,intrest_Rate,process_Fee,gst,arranger,total_Tenor,moratorioum
 @url : http://localhost:9000/contacts/
 */
lenderRouter.post("/", TokenMiddleware, [
    body('name').not().isEmpty().withMessage("Name is Required"),
    // body('imageUrl').not().isEmpty().withMessage("imageUrl is Required"),
     body('mobile').not().isEmpty().withMessage("mobile is Required"),
    body('address').not().isEmpty().withMessage("address is Required"),
    body('loan_Amount').not().isEmpty().withMessage("loan_Amount is Required"),
    body('disb_Date').not().isEmpty().withMessage("disb_Date is Required"),
    body('intrest_Rate').not().isEmpty().withMessage("intrest_Rate is Required"),
    body('process_Fee').not().isEmpty().withMessage("process_Fee is Required"),
    body('arranger').not().isEmpty().withMessage("arranger is Required"),
    body('total_Tenor').not().isEmpty().withMessage("total_Tenor is Required"),
    body('moratorioum').not().isEmpty().withMessage("moratorioum is Required"),
    body('marginIntrest').not().isEmpty().withMessage("marginIntrest is Required"),
    body('marginAmount').not().isEmpty().withMessage("marginAmount is Required"),
    body('others').not().isEmpty().withMessage("other Amount is Required")
], async (request: Request, response: Response) => {
    await lenderController.createLender(request, response);
});


/**
 @usage : Update a contact
 @method : PUT
 @params : name, imageUrl, mobile, address,loan_Amount,disb_Date,intrest_Rate,process_Fee,gst,arranger,total_Tenor,moratorioum
 @url : http://localhost:9000/contacts/:contactId
 */
lenderRouter.put("/:contactId", TokenMiddleware, [
    body('name').not().isEmpty().withMessage("Name is Required"),
    // body('imageUrl').not().isEmpty().withMessage("imageUrl is Required"),
    body('mobile').not().isEmpty().withMessage("mobile is Required"),
    body('address').not().isEmpty().withMessage("address is Required"),
    body('loan_Amount').not().isEmpty().withMessage("loan_Amount is Required"),
    body('disb_Date').not().isEmpty().withMessage("disb_Date is Required"),
    body('intrest_Rate').not().isEmpty().withMessage("intrest_Rate is Required"),
    body('process_Fee').not().isEmpty().withMessage("process_Fee is Required"),
    body('arranger').not().isEmpty().withMessage("arranger is Required"),
    body('total_Tenor').not().isEmpty().withMessage("total_Tenor is Required"),
    body('moratorioum').not().isEmpty().withMessage("moratorioum is Required"),
    body('marginIntrest').not().isEmpty().withMessage("marginIntrest is Required"),
    body('marginAmount').not().isEmpty().withMessage("marginAmount is Required"),
    body('others').not().isEmpty().withMessage("other Amount is Required")
], async (request: Request, response: Response) => {
    await lenderController.updateLender(request, response);
});


/**
 @usage : Delete a contact
 @method : DELETE
 @params : no-params
 @url : http://localhost:9000/contacts/:contactId
 */
lenderRouter.delete("/:contactId", TokenMiddleware, async (request: Request, response: Response) => {
    await lenderController.deleteLender(request, response);
});

export default lenderRouter;