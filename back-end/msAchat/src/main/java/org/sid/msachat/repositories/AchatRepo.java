package org.sid.msachat.repositories;

import org.sid.msachat.entities.Achat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchatRepo extends JpaRepository<Achat,Long> {
}
