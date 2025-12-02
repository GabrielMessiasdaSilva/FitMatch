package com.fitmatch.mobile.domain.usecase

import com.fitmatch.mobile.data.repository.UserRepository

class RegisterUseCase(private val repo: UserRepository) {
    suspend operator fun invoke(email: String, password: String) = Result.success(true)
}