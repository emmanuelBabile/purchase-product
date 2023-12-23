package org.sid.msachat.web;

import org.sid.msachat.dto.AchatReq;
import org.sid.msachat.dto.AchatResponse;
import org.sid.msachat.dto.Currency;
import org.sid.msachat.services.AchatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/achat")
public class AchatController {
    @Autowired
    AchatService achatService;

    @PostMapping("/add")
    public AchatResponse add(@RequestBody AchatReq achatReq){
        return achatService.add(achatReq);
    }

}
