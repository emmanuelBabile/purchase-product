package org.sid.msachat.services;

import org.sid.msachat.dto.AchatReq;
import org.sid.msachat.dto.AchatResponse;
import org.sid.msachat.dto.Currency;

public interface AchatService {
    public AchatResponse add(AchatReq achatReq);
}
