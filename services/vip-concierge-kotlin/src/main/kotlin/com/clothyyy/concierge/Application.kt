package com.clothyyy.concierge

import com.clothyyy.concierge.models.VipConsultationRequest
import io.ktor.serialization.gson.*
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import java.time.Instant

fun main() {
    println("[CLOTHYYY Kotlin VIP Concierge] Initializing Netty/Ktor server on port 8086...")
    embeddedServer(Netty, port = 8086, host = "0.0.0.0") {
        install(ContentNegotiation) {
            gson {
                setPrettyPrinting()
            }
        }
        install(CORS) {
            anyHost()
            allowHeader("*")
            allowMethod(io.ktor.http.HttpMethod.Options)
            allowMethod(io.ktor.http.HttpMethod.Get)
            allowMethod(io.ktor.http.HttpMethod.Post)
        }

        val vipService = VipClientService()

        routing {
            get("/health") {
                call.respond(mapOf(
                    "service" to "CLOTHYYY VIP Concierge & Private Salon Engine",
                    "status" to "HEALTHY_ONLINE",
                    "language" to "Kotlin 1.9 (Ktor Netty)",
                    "coroutine_dispatchers" to "OPTIMIZED_ASYNC_IO",
                    "timestamp" to Instant.now().toString()
                ))
            }

            post("/api/v1/vip/book-salon") {
                val req = call.receive<VipConsultationRequest>()
                val response = vipService.schedulePrivateSalon(req)
                call.respond(response)
            }
        }
    }.start(wait = true)
}
